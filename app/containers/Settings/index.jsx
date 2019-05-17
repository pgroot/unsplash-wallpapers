// @flow

import React, { PureComponent, Fragment } from 'react';
import type { SyntheticEvent } from 'react';
import { remote } from 'electron';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import type { Map as MapType } from 'immutable';
import storage from 'electron-json-storage';
import moment from 'moment';
import AutoLaunch from 'auto-launch';
import appPackage from '../../../package';
import StyledSettings from './style';
import {
  setUpdateWallpaperSchedule,
  setUpdateWallpaperTime,
  setActiveTheme,
  setAutomaticChangeActiveTheme,
  setDownloadTargetDir,
  setTempDir,
  setHistoryLimit,
} from './redux';

type Props = {
  setUpdateWallpaperScheduleAction : (data : string) => void,
  setUpdateWallpaperTimeAction : (data : string) => void,
  setActiveThemeAction : (data : string) => void,
  setAutomaticChangeActiveThemeAction : (data : boolean) => void,
  updateWallpaperSchedule : MapType,
  activeTheme : string,
  isChangeAutomaticActiveTheme : boolean,
  downloadTargetDir: string,
  setDownloadTargetDir: (data: string) => void,
  setTempDir: (data: string) => void,
  historyLimit: number,
  setHistoryLimit: (data: number) => void,
};

type State = {
  isRunAtStartup : boolean,
};

@connect(
  state => ({
    updateWallpaperSchedule: state.getIn(['Settings', 'updateWallpaperSchedule']),
    activeTheme: state.getIn(['Settings', 'activeTheme']),
    isChangeAutomaticActiveTheme: state.getIn(['Settings', 'isChangeAutomaticActiveTheme']),
    downloadTargetDir: state.getIn(['Settings', 'downloadTargetDir']),
    tempDir: state.getIn(['Settings', 'tempDir']),
    historyLimit: state.getIn(['Settings', 'historyLimit']),
  }),
  {
    setUpdateWallpaperScheduleAction: setUpdateWallpaperSchedule,
    setUpdateWallpaperTimeAction: setUpdateWallpaperTime,
    setActiveThemeAction: setActiveTheme,
    setAutomaticChangeActiveThemeAction: setAutomaticChangeActiveTheme,
    setDownloadTargetDir: setDownloadTargetDir,
    setTempDir: setTempDir,
    setHistoryLimit: setHistoryLimit,
  },
)
@autobind
class Settings extends PureComponent<Props, State> {
  static handleQuit() {
    remote.getCurrentWindow()
      .close();
  }

  constructor(props) {
    super(props);
    this.state = {
      isRunAtStartup: false,
    };
    this.updateMethods = ['Hourly', 'Daily', 'Weekly', 'Manually'];
    this.historyLimitOptions = [10, 50, 100, 150, 200];
  }

  componentDidMount() {
    storage.get('isRunAtStartup', (error, status) => {
      this.setState({
        isRunAtStartup: status,
      });
    });
  }

  handleRunInStartup = ({ target: { checked } }) => {
    this.setState({
      isRunAtStartup: checked,
    });
    storage.set('isRunAtStartup', checked);
    const minecraftAutoLauncher = new AutoLaunch({
      name: 'Unsplash Wallpapers',
      path: '/Applications/Unsplash Wallpapers.app', // eslint-disable-line
    });
    if (checked) {
      minecraftAutoLauncher.enable();
    } else {
      minecraftAutoLauncher.disable();
    }
  };

  handleChangeUpdateWallpaperScadule(e : SyntheticEvent<HTMLButtonElement>) {
    const { setUpdateWallpaperScheduleAction, setUpdateWallpaperTimeAction } = this.props;
    setUpdateWallpaperScheduleAction(e.target.value);
    setUpdateWallpaperTimeAction(moment()
      .format('DD.MM.YYYY HH:mm'));
  }

  handleChangeTheme(e : SyntheticEvent<HTMLInputElement>) {
    const { setActiveThemeAction } = this.props;
    setActiveThemeAction(e.target.value);
  }

  handleSetAutoChangeTheme(e : SyntheticEvent<HTMLInputElement>) {
    const { setAutomaticChangeActiveThemeAction } = this.props;
    setAutomaticChangeActiveThemeAction(e.target.checked);
  }

  handleDownloadDirChange(e : SyntheticEvent<HTMLInputElement>) {
    const { setDownloadTargetDir } = this.props;
    setDownloadTargetDir(e.target.value);
  }

  handleTempDirChange(e : SyntheticEvent<HTMLInputElement>) {
    const { setTempDir } = this.props;
    setTempDir(e.target.value);
  }

  handleSetHistoryLimit(e : SyntheticEvent<HTMLInputElement>) {
    const { setHistoryLimit } = this.props;
    setHistoryLimit(parseInt(e.target.value));
  }


  render() {
    const { updateWallpaperSchedule, activeTheme, isChangeAutomaticActiveTheme, downloadTargetDir, tempDir, historyLimit } = this.props;
    const { isRunAtStartup } = this.state;
    return (
      <StyledSettings>
        <h3>Settings</h3>
        <label
          className="run-at-startup"
          htmlFor="run-at-startup"
        >
          Run at startup
          <input
            id="run-at-startup"
            type="checkbox"
            onChange={this.handleRunInStartup}
            checked={isRunAtStartup}
          />
        </label>
        {/* eslint-disable-next-line */}
        <label
          className="auto-update"
          htmlFor="update-method"
        >
          Update
          <select
            id="update-method"
            onChange={this.handleChangeUpdateWallpaperScadule}
            defaultValue={updateWallpaperSchedule}
          >
            {
              this.updateMethods.map((updateMethod : string) => (
                <option key={updateMethod} value={updateMethod}>
                  {updateMethod}
                </option>
              ))
            }
          </select>
        </label>
        <div className="choose-theme">
          <p>
            Theme:
            {
              (process.platform === 'darwin')
              && (
                <Fragment>
                  <span>change auto by OS</span>
                  <input
                    className="changeAutoSetTheme"
                    type="checkbox"
                    onChange={this.handleSetAutoChangeTheme}
                    checked={isChangeAutomaticActiveTheme}
                  />
                </Fragment>
              )
            }
          </p>
          {
            !isChangeAutomaticActiveTheme
            && (
              <Fragment>
                <label htmlFor="light">
                  Light
                  <input
                    id="light"
                    type="radio"
                    onChange={this.handleChangeTheme}
                    value="Light"
                    checked={activeTheme === 'Light'}
                  />
                </label>
                <label htmlFor="dark">
                  Dark
                  <input
                    id="dark"
                    type="radio"
                    onChange={this.handleChangeTheme}
                    value="Dark"
                    checked={activeTheme === 'Dark'}
                  />
                </label>
              </Fragment>
            )
          }
        </div>
        <div className="dirs-download">
          <label
            className="download-dir"
            htmlFor="download-dir"
          >
            Download Dir
            <input id="download-dir" type="text" value={downloadTargetDir} onChange={this.handleDownloadDirChange} />
          </label>

        </div>
        <label
          className="auto-update"
          htmlFor="update-method"
        >
          History Limit
          <select
            id="update-method"
            defaultValue={historyLimit}
            onChange={this.handleSetHistoryLimit}
          >
            {
              this.historyLimitOptions.map((limit : number) => (
                <option key={limit} value={limit}>
                  {limit}
                </option>
              ))
            }
          </select>
        </label>
        <button onClick={Settings.handleQuit} className="quit">
          Quit Unsplash Wallpapers
        </button>
        <p className="version">
          version:
          {appPackage.version}
        </p>
      </StyledSettings>
    );
  }
}

export default Settings;

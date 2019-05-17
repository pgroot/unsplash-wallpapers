// @flow

import { fromJS } from 'immutable';
import type { fromJS as fromJSType } from 'immutable';
import os from 'os';
import path from 'path';

type InitialState = {
  updateWallpaperDate: string,
  updateWallpaperSchedule: string,
  activeTheme: string,
  isChangeAutomaticActiveTheme: boolean,
  downloadTargetDir: string,
  tempDir: string,
  historyLimit: number,
};

export const SET_UPDATE_WALLPAPER_SCHEDULE = 'unsplash-wallpapers/Settings/SET_UPDATE_WALLPAPER_SCHEDULE';
export const SET_UPDATE_WALLPAPER_TIME = 'unsplash-wallpapers/Settings/SET_UPDATE_WALLPAPER_TIME';
export const SET_ACTIVE_THEME = 'unsplash-wallpapers/Settings/SET_ACTIVE_THEME';
export const SET_AUTOMATIC_CHANGE_ACTIVE_THEME = 'unsplash-wallpapers/Settings/SET_AUTOMATIC_CHANGE_ACTIVE_THEME';
export const SET_DOWNLOAD_TARGET_DIR = 'unsplash-wallpapers/Settings/SET_DOWNLOAD_TARGET_DIR'
export const SET_TEMP_TARGET_DIR = 'unsplash-wallpapers/Settings/SET_TEMP_TARGET_DIR'
export const SET_HISTORY_LIMIT = 'unsplash-wallpapers/Settings/SET_HISTORY_LIMIT'

const initialState: fromJSType<InitialState> = fromJS({
  updateWallpaperDate: '',
  updateWallpaperSchedule: 'Manually',
  activeTheme: 'Light',
  isChangeAutomaticActiveTheme: process.platform === 'darwin',
  downloadTargetDir: path.join(os.homedir(), '/Pictures/Unsplash'),
  tempDir: path.join(os.tmpdir()),
  historyLimit: 50,
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_UPDATE_WALLPAPER_SCHEDULE:
      return state.set('updateWallpaperSchedule', action.data);
    case SET_UPDATE_WALLPAPER_TIME:
      return state.set('updateWallpaperDate', action.data);
    case SET_ACTIVE_THEME:
      return state.set('activeTheme', action.data);
    case SET_AUTOMATIC_CHANGE_ACTIVE_THEME:
      return state.set('isChangeAutomaticActiveTheme', action.data);
    case SET_DOWNLOAD_TARGET_DIR:
      return state.set('downloadTargetDir', action.data);
    case SET_TEMP_TARGET_DIR:
      return state.set('tempDir', action.data);
    case SET_HISTORY_LIMIT:
      return state.set('historyLimit', action.data)
    default:
      return state;
  }
};

export const setUpdateWallpaperSchedule = (data: string) => (
  dispatch => dispatch({ type: SET_UPDATE_WALLPAPER_SCHEDULE, data })
);

export const setUpdateWallpaperTime = (data: string) => (
  dispatch => dispatch({ type: SET_UPDATE_WALLPAPER_TIME, data })
);

export const setActiveTheme = (data: string) => (
  dispatch => dispatch({ type: SET_ACTIVE_THEME, data })
);

export const setAutomaticChangeActiveTheme = (data: string) => (
  dispatch => dispatch({ type: SET_AUTOMATIC_CHANGE_ACTIVE_THEME, data })
);

export const setDownloadTargetDir = (data: string) => (
  dispatch => dispatch({ type: SET_DOWNLOAD_TARGET_DIR, data })
);

export const setTempDir = (data: string) => (
  dispatch => dispatch({ type: SET_TEMP_TARGET_DIR, data })
);

export const setHistoryLimit = (data: number) => (
  dispatch => dispatch({ type: SET_HISTORY_LIMIT, data })
);

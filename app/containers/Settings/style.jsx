// @flow

import styled from 'styled-components';
import theme from 'styled-theming';
import { boxsBackgroundColor, textsColor } from 'app/styles/theme';

const quitButtonColor = theme('mode', {
  Light: '#fff',
  Dark: '#4e5252',
});

const quitButtonTextColor = theme('mode', {
  Light: '#222',
  Dark: '#b4b3b7',
});

export default styled.div`
  background: ${boxsBackgroundColor};
  display: flex;
  height: calc(100vh - 50px);
  align-items: center;
  flex-direction: column;
  padding: 0 10px;
  box-sizing: border-box;
  width: 100%;
  position: relative;
  justify-content: stretch;
  > h3 {
    margin: 10px 0 20px;
    font-size: 20px;
    text-align: center;
    color: ${textsColor};
  }
  > * {
    margin: 10px 0;
  }
  > label {
    font-weight: bold;
    color: ${textsColor};
    text-align: center;
    margin-bottom: 10px;
    &.run-at-startup {
      user-select: none;
      display: block;
      input {
        margin-left: 5px;
      }
    }
    &.auto-update {
      > select {
        margin-left: 5px;
        outline: none;
      }
    }
    &.download-dir {
      > input {
        margin-left: 5px;
      }
    }
  }
  > .choose-theme {
      text-align: center;
      > p {
        font-weight: bold;
        margin: 0 0 5px;
        display: flex;
        align-items: center;
        color: ${textsColor};
        > span {
          margin-left: 10px;
          font-weight: normal;
        }
        > .changeAutoSetTheme {
          margin-left: 5px;
        }
      }
      > label {
        color: ${textsColor};
        display: inline-block;
        user-select: none;
        &:last-child {
          margin-right: 0;
        }
        margin-right: 10px;
        > input {
          margin-left: 5px;
        }
      }
    }
  .quit {
    position: absolute;
    bottom: 35px;
    background: ${quitButtonColor};
    color: ${quitButtonTextColor}
    font-size: 12px;
    padding: 5px 10px;
    margin: auto;
    border-radius: 4px;
  }
  .version {
    position: absolute;
    bottom: 7px;
    margin: auto;
    text-align: center;
    font-size: 11px;
    color: #999;
    cursor: default;
  }
`;

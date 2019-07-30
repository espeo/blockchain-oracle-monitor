import React, { PureComponent } from 'react';

import { RequestTableCell, RequestTableRow, RequestLabel, RequestContent, Loader } from './components';
import { utils } from 'ethers';
import { Labels } from './namespace';

export interface RequestProps {
  id: string;
  errorCode?: utils.BigNumber;
  value: string;
  validFrom: Date;
  url: string;
  isOdd: boolean;
  labels: string[];
  transactionHash: string;
  handleUpdateState: object;
}

enum ErrorCodes {
  INVALID_URL = '1000',
  INVALID_CONTENT_TYPE = '1001',
  INVALID_SELECTOR_DATA = '4000',
  NO_MATCHING_ELEMENTS_FOUND = '4004',
  INTERNAL_SERVER_ERROR = '5000',
  OK = '0',
}

class Request extends PureComponent<RequestProps> {

  codeMapper(code: string): string {
    switch (code) {
      case ErrorCodes.INVALID_URL:
        return 'INVALID_URL';
      case ErrorCodes.INVALID_CONTENT_TYPE:
        return 'INVALID_CONTENT_TYPE';
      case ErrorCodes.INVALID_SELECTOR_DATA:
        return 'INVALID_SELECTOR_DATA';
      case ErrorCodes.NO_MATCHING_ELEMENTS_FOUND:
        return 'NO_MATCHING_ELEMENTS_FOUND';
      case ErrorCodes.INTERNAL_SERVER_ERROR:
        return 'INTERNAL_SERVER_ERROR';
      case ErrorCodes.OK:
        return 'OK';
      default:
        return `HTTP ERROR ${code}`;
    }
  };

  render() {
    const {
      id, url, validFrom, value, errorCode, isOdd,
    } = this.props;
    return (
      errorCode ?
        <RequestTableRow isOdd={isOdd}>
          <RequestTableCell>
            <RequestLabel>
              {Labels.id}
            </RequestLabel>
            <RequestContent>
              {id}
            </RequestContent>
          </RequestTableCell>
          <RequestTableCell>
            <RequestLabel>{Labels.call}</RequestLabel>
            <RequestContent>
              {url}
            </RequestContent>
          </RequestTableCell>
          <RequestTableCell>
            <RequestLabel>{Labels.valid}</RequestLabel>
            <RequestContent>
              {
                validFrom.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })
              }
            </RequestContent>
          </RequestTableCell>
          <RequestTableCell>
            <RequestLabel>{Labels.value}</RequestLabel>
            <RequestContent>
              {
                this.codeMapper(errorCode.toString()) === 'OK' ? value : 'ERROR'
              }
            </RequestContent>
          </RequestTableCell>
          <RequestTableCell>
            <RequestLabel>{Labels.status}</RequestLabel>
            <RequestContent>
              {
                this.codeMapper(errorCode.toString())
              }
            </RequestContent>
          </RequestTableCell>
        </RequestTableRow>
        :
        <RequestTableRow isOdd={isOdd}>
          <RequestTableCell>
            <RequestLabel></RequestLabel>
            <RequestContent>
              <Loader>Loading...</Loader>
            </RequestContent>
          </RequestTableCell>
        </RequestTableRow>
    );
  }
}

export default Request;

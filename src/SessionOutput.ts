import { serverError } from './serverError';
export class SessionOutput {
  
    constructor(request, private response) {

    }

	onSessionStarted(): any {
  
    }
  
	onSessionFinished(scriptsPassed: number, scriptsFailed: number): any {
  
    }
  
	 onScriptPending(scriptId: string, fileName: string, scriptName: string): any {
  
    }
  
	onScriptStarted(scriptId: string): any {
  
    }
  
	onScriptFinished(scriptId: string, error: Error): any {
        if (error != null) {
            serverError(this.response, error);
        }
    }
  
	onLog(scriptId: string, logLevel: string, message: string): any {
      console.log(message);
    }

    onHttpSent() {}
    onHttpReceived() {}
}
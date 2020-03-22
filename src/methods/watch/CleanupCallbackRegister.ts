import {Runnable} from '../../util/types';

export default class CleanupCallbackRegister {

	private callback: Runnable | null = null;

	public registerCallback(callback: Runnable) {
		this.callback = callback;
	}

	public execute() {
		if (this.callback) {
			this.callback();
			this.callback = null;
		}
	}

}

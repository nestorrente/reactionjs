import reactive from './reactive';
import {Ref, REF_PROP_NAME} from './types';

export default function ref<T>(value: T): Ref<T> {

	const refObject = reactive({
		value
	});

	Object.defineProperty(refObject, REF_PROP_NAME, {value: true});

	return refObject as Ref<T>;

}

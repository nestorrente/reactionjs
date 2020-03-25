import reactive from './reactive';
import Ref, {isRef, REF_PROP_NAME} from '../util/Ref';

export default function ref<T>(value: T | Ref<T>): Ref<T> {

	if (isRef(value)) {
		return value;
	}

	const refObject = reactive({
		value
	}) as { value: T };

	Object.defineProperty(refObject, REF_PROP_NAME, {value: true});

	return refObject as Ref<T>;

}

export default function nextTick(callback: () => void): void {
	setTimeout(callback, 0);
}

import { useEffect, useRef } from "react";

export const useDebounce = (callback: (...props: never[]) => void, delay: number) => {
	const latestCallback = useRef<typeof callback>();
	const latestTimeout = useRef<ReturnType<typeof setTimeout>>();

	useEffect(() => {
		latestCallback.current = callback;
	}, [callback]);

	const stop = () => {
		if (latestTimeout.current) {
			clearTimeout(latestTimeout.current);
		}
	};

	return [
		(...props: Parameters<typeof callback>) => {
			stop();
			latestTimeout.current = setTimeout(() => {
				latestCallback.current?.(...props);
			}, delay);
		},
		stop,
	];
};

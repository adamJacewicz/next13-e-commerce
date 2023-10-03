import { useEffect, useRef } from "react";

export const useDebounce = (callback: (...props: never[]) => void, delay: number) => {
	const latestCallback = useRef<typeof callback>();
	const latestTimeout = useRef<ReturnType<typeof setTimeout>>();

	useEffect(() => {
		latestCallback.current = callback;
	}, [callback]);

	return (...props: Parameters<typeof callback>) => {
		if (latestTimeout.current) {
			clearTimeout(latestTimeout.current);
		}
		latestTimeout.current = setTimeout(() => {
			latestCallback.current?.(...props);
		}, delay);
	};
};

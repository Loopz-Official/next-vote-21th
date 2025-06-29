import { useEffect, RefObject } from 'react';

export default function useOutsideClick<T extends HTMLElement>(
	ref: RefObject<T | null>,
	handler: () => void
) {
	useEffect(() => {
		function handleClick(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				handler();
			}
		}
		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [ref, handler]);
}

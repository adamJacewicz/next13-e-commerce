"use client";

import { forwardRef, useState, useImperativeHandle } from "react";
import { RatingStar } from "@/components/atoms/RatingStar";

const inputs = Array.from({ length: 5 }, (_, i) => Math.abs(5 - i));

export const InputRating = forwardRef((props, ref) => {
	const [value, setValue] = useState(1);
	useImperativeHandle(
		ref,
		() => {
			return {
				reset() {
					setValue(1);
				},
			};
		},
		[],
	);
	return (
		<div ref={ref} className="stars-rating dir-rtl flex max-w-max items-center">
			{inputs.map((inputValue) => (
				<label
					key={inputValue}
					className="peer/label hover:[&>svg]:fill-amber-400 hover:[&>svg]:stroke-amber-400 peer-hover/label:[&>svg]:fill-amber-400 peer-hover/label:[&>svg]:stroke-amber-400"
				>
					<input
						onChange={() => setValue(inputValue)}
						checked={value === inputValue}
						className="sr-only"
						type="radio"
						name="rating"
						value={inputValue}
					/>
					<RatingStar className="cursor-pointer" filled={value >= inputValue} />
				</label>
			))}
		</div>
	);
});

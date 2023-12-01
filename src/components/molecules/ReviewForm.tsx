"use client";
import { useRef } from "react";
import { SignedIn } from "@clerk/nextjs";
import { InputRating } from "../atoms/InputRating";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ReviewForm({ formAction }: { formAction: (data: FormData) => Promise<void> }) {
	const formRef = useRef<HTMLFormElement | null>(null);
	const inputRatingRef = useRef<{ reset: () => void } | null>(null);

	return (
		<SignedIn>
			<section className="max-w-md">
				<header>
					<h3 className="text-lg font-medium">Share your thoughts</h3>
					<p className="mt-1 text-sm text-gray-600">
						If you’ve used this product, share your thoughts with other customers
					</p>
				</header>
				<div className="mt-4">
					<form
						ref={formRef}
						action={async (data) => {
							await formAction(data);
							formRef.current?.reset();
							inputRatingRef.current?.reset();
						}}
						data-testid="add-review-form"
						className="flex flex-col gap-4 text-xs"
					>
						<Label>
							<span className="mb-1 block text-xs">Name</span>
							<Input name="name" required />
						</Label>
						<Label>
							<span className="mb-1 block text-xs">Title</span>
							<Input name="headline" required />
						</Label>
						<Label>
							<span className="mb-1 block text-xs">Review</span>
							<Textarea className="max-h-[150px]" name="content" required />
						</Label>
						<div>
							<span className="mb-1 block text-xs">Rate</span>
							<InputRating ref={inputRatingRef} />
						</div>

						<Button type="submit">Submit</Button>
					</form>
				</div>
			</section>
		</SignedIn>
	);
}

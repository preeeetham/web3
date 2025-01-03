'use client';

import { StaticPage } from "./StaticPage";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea"
import { Card } from "./ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";

export function DonateForm() {
    // Initialize the form with React Hook Form
    const form = useForm({
        defaultValues: {
            title: "",
            imageUrl: "",
            description: "",
            label: "",
        },
    });

    // Handle form submission
    const onSubmit = (data: any) => {

        console.log("Form Data:", data);
    };

    return (
        <div className="flex px-10 relative">
            <StaticPage />
            <div className="absolute inset-0 flex items-center justify-center">
                <Card className="w-96 flex flex-col items-center p-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
                            {/* Title Field */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold text-base">Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter Title"
                                                {...field}
                                                className="rounded-lg border-black"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* Image URL Field */}
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold text-base">Image URL</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter Image URL (e.g., https://image.com/image.jpg)"
                                                {...field}
                                                className="rounded-lg border-black"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* Description Field */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold text-base">Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter Description"
                                                {...field}
                                                className="rounded-lg border-black h-20 items-start justify-start"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* Label Field */}
                            <FormField
                                control={form.control}
                                name="label"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold text-base">Label</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter Label"
                                                {...field}
                                                className="rounded-lg border-black"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* Submit Button */}
                            <Button type="submit" className="w-full rounded-lg">
                                Submit
                            </Button>
                        </form>
                    </Form>
                </Card>
            </div>
        </div>
    );
}


{
    "title": "hey ther",
    "icon": "https://image.com/image",
    "description": "heyh heyey heyey",
    "label": "heyy heyy",
  }
import React from "react";
import { useStore } from "@/lib/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

const formSchema = z.object({
  model: z.string().min(1, { message: "Please select a model" }),
  userInput: z.string().optional(),
  niche: z.string().min(1, { message: "Please select a niche" }),
  tone: z.string().min(1, { message: "Please select a tone" }),
  length: z.number().min(30).max(600),
});

interface ScriptConfigFormProps {
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
}

const ScriptConfigForm = ({ onSubmit = () => {} }: ScriptConfigFormProps) => {
  const { customNiches } = useStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "gpt-4",
      niche: "technology",
      tone: "professional",
      length: 120,
      userInput: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  return (
    <Card className="w-full p-4 bg-background border-border">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>AI Model</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="claude-2">Claude 2</SelectItem>
                    <SelectItem value="claude-instant">
                      Claude Instant
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the AI model for script generation
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="userInput"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Instructions (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter any specific instructions or context for the AI..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Add any specific requirements or context for the script
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="niche"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content Niche</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a niche" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    {customNiches.map((niche) => (
                      <SelectItem key={niche} value={niche}>
                        {niche}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the main topic area for your content
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content Tone</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a tone" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="inspirational">Inspirational</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the tone of voice for your content
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="length"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video Length (seconds)</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Slider
                      min={30}
                      max={600}
                      step={30}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                    <div className="text-sm text-muted-foreground text-right">
                      {field.value} seconds
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Choose the desired length of your video
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Generate Script
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default ScriptConfigForm;

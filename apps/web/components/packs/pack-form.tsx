 "use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash2, ImageIcon } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { type Pack, type PackFormValues } from "common/inferred";
import { packSchema } from "common/types";

interface PackFormProps {
  pack?: Pack;
  onSuccess?: () => void;
}

export function PackForm({ pack }: PackFormProps) {
  const { getToken } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<PackFormValues>({
    resolver: zodResolver(packSchema),
    defaultValues: pack
      ? {
          id: pack.id,
          name: pack.name,
          description: pack.description,
          imageUrl1: pack.imageUrl1,
          imageUrl2: pack.imageUrl2,
          prompts: pack.prompts,
        }
      : {
          name: "",
          description: "",
          imageUrl1: "",
          imageUrl2: "",
          prompts: [{ prompt: "" }],
        },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "prompts",
  });

  const updatePack = async (id: string, data: PackFormValues) => {
    try {
      const token = await getToken();
      const response = await axios.put(`/pack/${id}`, data,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      )
      console.log(response.data.pack);
    } catch (error) {
      console.error("Failed to update pack:", error);
    }
  };

  const createPack = async (data: PackFormValues) => {
    try {
      const token = await getToken();
      const response = await axios.post("/pack", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.pack);
    } catch (error) {
      console.error("Failed to create pack:", error);
    }
  }


  const onSubmit = async (data: PackFormValues) => {
    setIsSubmitting(true);
    try {
      if (pack) {
        await updatePack(pack.id, data)
        console.log("Updating pack:", data);
        toast({
          title: "Pack updated",
          description: "Your content pack has been updated successfully.",
        });
      } else {
        await createPack(data)
        console.log("Creating pack:", data);
        toast({
          title: "Pack created",
          description: "Your new content pack has been created successfully.",
        });
      }
      // onSuccess()
    } catch (error) {
      toast({
        variant: "destructive",
        title: pack ? "Failed to update pack" : "Failed to create pack",
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4 p-4">
          <div>
            <h3 className="text-xl font-semibold">Pack Details</h3>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter pack name"
                    className="mt-1"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter pack description"
                    className="min-h-[120px] mt-1"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4 p-4">
          <div>
            <h3 className="text-xl font-semibold">Pack Images</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="imageUrl1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Image 1</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter image URL"
                        className="mt-0"
                        {...field}
                      />
                      {field.value && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="flex-shrink-0 cursor-pointer"
                          onClick={() => {
                            window.open(field.value, "_blank");
                          }}
                        >
                          <ImageIcon className="h-4 w-4" />
                          <span className="sr-only">Preview image</span>
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Image 2</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter image URL"
                        className="mt-0"
                        {...field}
                      />
                      {field.value && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="flex-shrink-0 cursor-pointer"
                          onClick={() => {
                            window.open(field.value, "_blank");
                          }}
                        >
                          <ImageIcon className="h-4 w-4" />
                          <span className="sr-only">Preview image</span>
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Prompts</h3>
            </div>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              size="sm"
              onClick={() => append({ prompt: "" })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Prompt
            </Button>
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border rounded-lg p-6 space-y-4 relative"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 cursor-pointer text-muted-foreground hover:text-destructive"
                onClick={() => {
                  if (fields.length > 1) {
                    remove(index);
                  } else {
                    toast({
                      variant: "destructive",
                      title: "Cannot remove prompt",
                      description: "You must have at least one prompt.",
                    });
                  }
                }}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove prompt</span>
              </Button>

              <FormField
                control={form.control}
                name={`prompts.${index}.prompt`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Prompt Text</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter prompt text"
                        className="min-h-[100px] mt-1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4 p-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {pack ? "Update Pack" : "Create Pack"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

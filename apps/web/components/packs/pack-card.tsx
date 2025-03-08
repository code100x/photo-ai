"use client";

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Pack } from "@/types";
import Link from "next/link";

interface PackCardProps {
  pack: Pack;
  onDelete: () => void;
}

export function PackCard({ pack, onDelete }: PackCardProps) {
  return (
    <Link href={`/admin/packs/${pack.id}`}>
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md group">
        <CardHeader className="relative pb-2">
          <div className="absolute right-4 top-4 flex items-center gap-2">
            {/* <Badge variant="secondary" className="font-normal">
            {pack.prompts.length} {pack.prompts.length === 1 ? "prompt" : "prompts"}
          </Badge> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(event) => {
                    event.stopPropagation();
                    onDelete();
                  }}
                  className="text-destructive focus:text-destructive cursor-pointer"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardTitle className="group-hover:text-primary transition-colors">
            {pack.name}
          </CardTitle>
          <CardDescription className="line-clamp-3">
            {pack.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 h-64">
            <div className="relative rounded-md overflow-hidden bg-muted">
              {pack.imageUrl1 ? (
                <Image
                  src={pack.imageUrl1 || "/placeholder.svg"}
                  alt={`${pack.name} image 1`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  No image
                </div>
              )}
            </div>
            <div className="relative rounded-md overflow-hidden bg-muted">
              {pack.imageUrl2 ? (
                <Image
                  src={pack.imageUrl2 || "/placeholder.svg"}
                  alt={`${pack.name} image 2`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  No image
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

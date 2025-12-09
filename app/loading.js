import { Spinner } from "@/components/ui/spinner";

export default function loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-neutral-950">
      <Spinner className="size-16 text-white" />
    </div>
  );
}

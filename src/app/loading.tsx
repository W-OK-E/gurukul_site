//This gives that effect where some parts of the page are loaded even if the entire page has not been returned.
import LoadingSkeleton from "@/components/LoadingSkeleton"

export default function Loading() {
  // Add fallback UI that will be shown while the route is loading.
  return <LoadingSkeleton/>
}
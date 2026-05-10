import type { ReactNode } from "react";
import { Suspense } from "react";

type SuspenseWrapperProps = {
    children: ReactNode
}

const SuspenseWrapper = ({children}: SuspenseWrapperProps) => {
  return (
    <Suspense fallback={null}>
        {children}
    </Suspense>
  )
}

export default SuspenseWrapper
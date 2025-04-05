import { DynamicComponents } from '@/utils/dynamic'

export default function Home(): JSX.Element {
  return (
    <div className="min-h-screen">
      <DynamicComponents.Console />
    </div>
  )
}

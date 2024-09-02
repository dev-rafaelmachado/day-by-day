import { withAuth } from 'next-auth/middleware'

type Props = {
  children: ReactNode
}

export default withAuth(function ProtectedPage({ children }: Props) {})

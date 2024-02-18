import { periodTime } from '@/utils/formated/periodTIme'
import { Pen, Trash } from '@phosphor-icons/react/dist/ssr'
import { Link } from '@phosphor-icons/react/dist/ssr/Link'

type Props = {
  title: string
  description?: string
  beginAt: string
  endAt?: string
  tags?: string[]
  link?: string
}

export const Card = ({
  title,
  description,
  beginAt,
  endAt,
  tags,
  link,
}: Props) => {
  return (
    <div className="text-cobalt-200 dark:text-cobalt-900 bg-cobalt-800 relative flex w-4/5 flex-col gap-2 rounded-lg px-6 py-4 dark:bg-hoki-100">
      <div className="flex w-full items-center justify-between">
        <span className="dark:bg-cobalt-800 bg-cobalt-100 text-cobalt-950 rounded-md px-2 py-1 text-sm dark:text-hoki-100">
          {periodTime(beginAt, endAt)}
        </span>
        <div className="flex gap-2">
          {tags?.map((tag) => (
            <span
              key={tag}
              className="dark:bg-cobalt-800 bg-cobalt-100 text-cobalt-950 rounded-md px-2 py-1 text-xs dark:text-hoki-100"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <h1 className="font-body text-2xl font-semibold">{title}</h1>
      <p>{description}</p>
      <div className="absolute bottom-4 right-6 flex flex-row-reverse gap-2">
        <button>
          <Trash size={'1.2rem'} />
        </button>
        <button>
          <Pen size={'1.2rem'} />
        </button>
        {link && (
          <a href={link}>
            <Link size={'1.2rem'} />
          </a>
        )}
      </div>
    </div>
  )
}

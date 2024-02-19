import { periodTime } from '@/utils/formated/periodTIme'
import { Pen, Trash } from '@phosphor-icons/react/dist/ssr'
import { Link } from '@phosphor-icons/react/dist/ssr/Link'
import { EditModal } from './EditModal'

type Props = {
  id: string
  title: string
  description?: string
  beginAt: string
  endAt?: string
  tags?: string[]
  link?: string
  remove: () => void
}

export const Card = ({
  id,
  title,
  description,
  beginAt,
  endAt,
  tags,
  link,
  remove,
}: Props) => {
  return (
    <div className="relative flex w-4/5 flex-col gap-2 rounded-lg bg-cobalt-800 px-6 py-4 text-cobalt-200 dark:bg-hoki-100 dark:text-cobalt-900">
      <div className="flex w-full items-center justify-between">
        <span className="rounded-md bg-cobalt-100 px-2 py-1 text-sm text-cobalt-950 dark:bg-cobalt-800 dark:text-hoki-100">
          {periodTime(beginAt, endAt)}
        </span>
        <div className="flex gap-2">
          {tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-cobalt-100 px-2 py-1 text-xs text-cobalt-950 dark:bg-cobalt-800 dark:text-hoki-100"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <h1 className="font-body text-2xl font-semibold">{title}</h1>
      <p>{description}</p>
      <div className="absolute bottom-4 right-6 flex flex-row-reverse gap-2">
        <button onClick={remove}>
          <Trash size={'1.2rem'} />
        </button>
        <EditModal
          register={{
            _id: id,
            title,
            description,
            beginAt,
            endAt,
            tags,
            link,
          }}
        >
          <button>
            <Pen size={'1.2rem'} />
          </button>
        </EditModal>
        {link && (
          <a href={link}>
            <Link size={'1.2rem'} />
          </a>
        )}
      </div>
    </div>
  )
}

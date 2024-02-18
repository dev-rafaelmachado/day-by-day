'use client'
import { Plus } from '@phosphor-icons/react/dist/ssr'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { useCreateRegister } from '@/hooks/querys/useCreateRegister'
import { useState } from 'react'

const schema = z.object({
  title: z.string({
    required_error: 'O título é obrigatório',
  }),
  description: z.string().optional(),
  beginAt: z.string({
    required_error: 'O horário de início é obrigatório',
  }),
  endAt: z.string().optional(),
  tags: z.string().optional(),
  link: z.string().optional().optional(),
})

type Props = {
  day: Date
}

export const AddModal = ({ day }: Props) => {
  const [open, setOpen] = useState(false)
  const { addRegister, isPending } = useCreateRegister()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: z.infer<typeof schema>) => {
    const tags = data.tags?.split(';').map((tag) => tag.trim())
    const beginAt = new Date(
      `${day.toISOString().split('T')[0]}T${data.beginAt}`,
    )
    const endAt = data.endAt
      ? new Date(`${day.toISOString().split('T')[0]}T${data.endAt}`)
      : undefined

    addRegister(
      {
        ...data,
        beginAt,
        endAt,
        tags,
      },
      {
        onSuccess: () => {
          form.reset()
          setOpen(false)
        },
      },
    )
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={'ghost'}
            size="icon"
            className=" flex items-center justify-center p-2 text-cobalt-900 dark:text-white"
          >
            <Plus size={'1.6rem'} />
          </Button>
        </DialogTrigger>
        <DialogContent className="border-none dark:bg-cobalt-950 dark:text-white">
          <DialogHeader>
            <DialogTitle>Adicionar uma nova atividade</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para adicionar uma nova atividade
            </DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input placeholder="Passar um café..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <FormField
                      control={form.control}
                      name="beginAt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Horário de início</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/2">
                    <FormField
                      control={form.control}
                      name="endAt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Horário de termino</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="www.google.com"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="estudo; tailwind"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Separe por ;</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button
                    className="flex w-16 items-center justify-center"
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                      >
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                          Loading...
                        </span>
                      </div>
                    ) : (
                      'Salvar'
                    )}
                  </Button>
                  <DialogClose asChild>
                    <Button variant="ghost">Cancelar</Button>
                  </DialogClose>
                </div>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

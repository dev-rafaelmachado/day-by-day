'use client'
import { GetRegisterByIdDTO } from '@/types/GetRegisterByIdDTO'
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogContent,
} from './ui/dialog'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from './ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode, useEffect, useState } from 'react'
import { Input } from './ui/input'
import { useEditRegister } from '@/hooks/querys/useEditRegister'
import { getHourAndMinute } from '@/utils/formated/getHourAndMinute'
import { Textarea } from './ui/textarea'
import { useSelectedDay } from '@/contexts/SelectedDayContext'

const schema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  beginAt: z.string().optional(),
  endAt: z.string().optional(),
  tags: z.string().optional(),
  link: z.string().optional().optional(),
})

type Props = {
  register: Omit<GetRegisterByIdDTO, 'createdAt' | 'updatedAt'>
  children: ReactNode
}

export const EditModal = ({ register, children }: Props) => {
  const { selectedDay: day } = useSelectedDay()
  const [open, setOpen] = useState(false)
  const { isPending, editRegister } = useEditRegister()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    const beginHour = getHourAndMinute(register.beginAt)
    const endHour = register.endAt
      ? getHourAndMinute(register.endAt)
      : undefined
    form.reset({
      title: register.title,
      description: register.description,
      beginAt: beginHour,
      endAt: endHour,
      tags: register.tags?.join('; '),
      link: register.link,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register])

  const onSubmit = (data: z.infer<typeof schema>) => {
    const tags = data.tags?.split(';').map((tag) => tag.trim())
    const beginAt = new Date(
      `${day.toISOString().split('T')[0]}T${data.beginAt}`,
    )
    const endAt = data.endAt
      ? new Date(`${day.toISOString().split('T')[0]}T${data.endAt}`)
      : undefined

    editRegister(
      {
        id: register._id,
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
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="border-none dark:bg-cobalt-950 dark:text-white">
          <DialogHeader>
            <DialogTitle>Editar uma atividade</DialogTitle>
            <DialogDescription>
              Altere os campos abaixo para editar uma atividade
            </DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
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
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Acordei logo cedo e fiz um café..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
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

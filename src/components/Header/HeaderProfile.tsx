"use client"

import { useFetch } from '@/hooks/useFetch';
import { useAuth } from '@/contexts/Auth';
import { getLocalStorage, setLocalStorage } from '@/hooks/useLocalStorage';
import * as Avatar from '@radix-ui/react-avatar';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotFilledIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function HeaderProfile() {
    const { logout } = useAuth()

    const router = useRouter()
    const [photoUrl, setPhotoUrl] = useState('');
    useFetch<{ photoUrl: string }>("/users/me", {
        headers: {
            Authorization: `Bearer ${getLocalStorage("accessToken")}`
        },
        next: {
            revalidate: 60 * 5 // 5 minutes
        }
    }).then(({ photoUrl }) => {
        console.log(photoUrl)
        setPhotoUrl(photoUrl)
    })

    const [person, setPerson] = useState('cliente');
    return (
        <div className="flex gap-4 justify-between items-center">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button
                        className="rounded-full w-16 h-16 inline-flex items-center justify-center text-black bg-white outline-none hover:bg-gray-600"
                        aria-label="Customise options"
                    >
                        <Avatar.Root className="bg-white flex h-16 w-16 items-center justify-center rounded-full align-center">
                            <Avatar.Image className="h-full w-full rounded-full object-cover"
                                src={photoUrl}
                                alt="Foto do usuário" />
                            <Avatar.Fallback className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium">
                                User
                            </Avatar.Fallback>
                        </Avatar.Root>
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade" sideOffset={5}>
                        <DropdownMenu.Item className="hover:bg-azulao hover:text-white group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                            <Link className="border-none w-full flex justify-start" href="/chat"><span className="text-base">Chat</span></Link>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="hover:bg-azulao hover:text-white group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                            <button className="border-none w-full flex justify-start" onClick={() => alert("Em desenvolvimento...")}><span className="text-base">Abrir Perfil</span></button>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="hover:bg-azulao hover:text-white group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                            <button className="border-none w-full flex justify-start" onClick={() => alert("Em desenvolvimento...")}><span className="text-base">Editar Perfil</span></button>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="hover:bg-azulao hover:text-white group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                            <button className="border-none w-full flex justify-start" onClick={() => alert("Em desenvolvimento")}><span className="text-base">Trocar Tema</span></button>
                        </DropdownMenu.Item>
                        {/* <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className={RadixStyles.DropdownMenuSubTrigger}>
              More Tools
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className={RadixStyles.DropdownMenuSubContent}
                sideOffset={2}
                alignOffset={-5}
              >
                <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                  Save Page As…
                </DropdownMenu.Item>
                <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">Create Shortcut…</DropdownMenu.Item>
                <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">Name Window…</DropdownMenu.Item>
                <DropdownMenu.Separator className={RadixStyles.DropdownMenuSeparator} />
                <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">Developer Tools</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub> */}

                        <DropdownMenu.Separator className="h-[1px] bg-violet6 m-[5px]" />

                        <DropdownMenu.Label className="pl-[25px] text-xs leading-[25px] text-mauve11">Estado</DropdownMenu.Label>
                        <DropdownMenu.RadioGroup value={person} onValueChange={setPerson}>
                            <DropdownMenu.RadioItem className="hover:bg-azulao hover:text-white text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1" value="cliente">
                                <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                    <DotFilledIcon />
                                </DropdownMenu.ItemIndicator>
                                <span className="text-base">Cliente</span>
                            </DropdownMenu.RadioItem>
                            <DropdownMenu.RadioItem className="hover:bg-azulao hover:text-white text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1" value="uzer">
                                <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                    <DotFilledIcon />
                                </DropdownMenu.ItemIndicator>
                                <span className="text-base">Uzer</span>
                            </DropdownMenu.RadioItem>
                        </DropdownMenu.RadioGroup>

                        <DropdownMenu.Separator className="h-[1px] bg-violet6 m-[5px]" />

                        <DropdownMenu.Item className="hover:bg-azulao hover:text-white group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                            <button className="border-none w-full flex justify-start" onClick={() => {
                                logout()
                                router.refresh()

                            }}><span className="text-base">Sair</span></button>
                        </DropdownMenu.Item>

                        <DropdownMenu.Arrow className="fill-white" />
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>
    )
}
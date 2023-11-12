import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, PuzzlePieceIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '../button/Button'
import { useNavigate } from 'react-router';

export default function ModalWin({open, setOpen}) {
    let navigate = useNavigate(); 


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-md transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                <button
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center absolute top-0 right-0 rounded-full">
                    <XMarkIcon className="h-6 w-6 text-gray" aria-hidden="true" />
                  </div>
                    </button> 
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <PuzzlePieceIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h1" className="text-base text-xl font-bold leading-6 text-gray-900">
                      Ура!
                    </Dialog.Title>
                    <Dialog.Title as="h3" className="text-base mt-2 font-semibold leading-6 text-gray-900">
                      Поздравляем c успешным прохождением игры!
                    </Dialog.Title>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 flex justify-center">
                  <Button
                  text={'Играть снова!'}
                    onClick={() => setOpen(false)}
                  />
                <Button text={'Выбрать другую картинку'} onClick={() => navigate("/gallery")}/> 

                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

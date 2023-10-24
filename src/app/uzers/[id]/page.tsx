import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import PortfolioCard from "./PortfolioCard";
import { useFetch } from "@/hooks/useFetch";
import UzerInterface from "@/types/Uzer";
import Image from "next/image";
import { cookies } from "next/headers";
import Editpage from "./editpage";
import ItemPortfolioInterface from "@/types/ItemPortfolio";

export default async function Uzer({ params }: { params: { id: string } }) {
  const uzerData = await useFetch<UzerInterface>(`/uzers/${params.id}`, {
    next: {
      revalidate: 60 * 1 // 1 minutes
    }
  })
  const { photoUrl, nome, servicosPrestados, _id } = uzerData
  const portfolio: ItemPortfolioInterface[] = [
    {
      image: "https://blog.cpetecnologia.com.br/wp-content/uploads/2018/05/195214-5-praticas-simples-de-gestao-de-projetos-para-ajudar-nos-resultados.jpg",
      title: "Aula em grupo",
      description: "Aula em grupo realizada dia tal do tal para tal do tal"
    },
    {
      image: "https://picsum.photos/200/300",
      title: "Aula individual",
      description: "Aula individual realizada dia tal do tal para tal do tal"
    },
    {
      image: "https://blog.cpetecnologia.com.br/wp-content/uploads/2018/05/195214-5-praticas-simples-de-gestao-de-projetos-para-ajudar-nos-resultados.jpg",
      title: "Aula em grupo",
      description: "Aula em grupo realizada dia tal do tal para tal do tal"
    },
  ]
  const bannerImage = "https://blog.cpetecnologia.com.br/wp-content/uploads/2018/05/195214-5-praticas-simples-de-gestao-de-projetos-para-ajudar-nos-resultados.jpg"
  console.log(_id)
  const { _id: myId } = await useFetch<UzerInterface>(`/users/me`, {
    headers: {
      Authorization: `Bearer ${cookies().get("uezaccesstoken")?.value}`
    },
  });
  uzerData.portfolio = portfolio
  uzerData.bannerImage = bannerImage
  // const editMode: boolean = myId === _id
  const editMode: boolean = true
  console.log(editMode)


  return editMode ? (
    <main className="w-full h-screen mobile:h-auto flex items-center justify-between relative mobile:flex-col desktop:flex-col mdscreen:flex-col  mobile:gap-24 desktop:gap-24 mdscreen:gap-24">
        <Link href="/uzers" className="fixed z-50 left-14 top-8 text-base font-bold px-2 bg-azulao hover:bg-roxazul rounded-xl text-white flex items-center justify-center mobile:bottom-8  mobile:right-7 mobile:top-auto mobile:left-auto mobile:rounded-full ">
          <ChevronLeftIcon width={20} height={20} />
          <span className="p-2">
            Voltar
          </span>
        </Link>
        <Editpage uzerData={uzerData} />

      </main>
  )
    : (
      <main className="w-full h-screen mobile:h-auto flex items-center justify-between relative mobile:flex-col desktop:flex-col mdscreen:flex-col  mobile:gap-24 desktop:gap-24 mdscreen:gap-24">
        <Link href="/uzers" className="fixed z-50 left-14 top-8 text-base font-bold px-2 bg-azulao hover:bg-roxazul rounded-xl text-white flex items-center justify-center mobile:bottom-8  mobile:right-7 mobile:top-auto mobile:left-auto mobile:rounded-full ">
          <ChevronLeftIcon width={20} height={20} />
          <span className="p-2">
            Voltar
          </span>
        </Link>
        <section className="w-2/3 mobile:w-full desktop:w-full mdscreen:w-full h-full flex flex-col items-center justify-center animate-transitionY">
          <div className="bg-cinzero w-10/12 mobile:w-full desktop:w-full mdscreen:w-full relative">
            <div
              className="w-full h-44 flex flex-col items-center justify-center gap-1 bg-cinzero rounded-xl bg-center bg-cover bg-no-repeat transition relative"
            >
              <Image
                fill
                src={bannerImage}
                className="transition object-cover object-center rounded-xl" alt="Imagem ilustrativa"
              />
              <h1 className="hidden font-medium z-40 group-hover:block transition text-base px-3 py-1 rounded bg-white text-black">Ver projeto</h1>
            </div>
            <Image width={200} height={200} src={photoUrl} className="w-32 rounded-full absolute -bottom-10 left-5 shadow-lg" alt="Imagem de perfil" />
          </div>
          <div className="w-10/12 flex items-center mt-24 mb-24 mobile:mb-4 justify-between desktop:flex-col mobile:flex-col mdscreen:flex-col">
            <div className="flex-1 flex flex-col items-start self-start pl-2">
              <h1 className="text-3xl font-bold mb-4">{nome}</h1>
              <h2 className="font-normal text-lg">Habilidade: <strong>{servicosPrestados[0].nomeServico}</strong> </h2>
              <h2 className="font-normal text-base"><strong>{servicosPrestados[0].tipoServico === 'ambos' ? "Online e Presencial" : servicosPrestados[0].tipoServico.toUpperCase()}</strong> </h2>
              {(servicosPrestados[0].tipoServico === 'presencial') || (servicosPrestados[0].tipoServico === 'ambos') && <h2 className="font-medium text-base">Área de atuação: <strong>{servicosPrestados[0].areaAtuacao}km</strong> </h2>}
            </div>
            <Link href="/uzers" className="text-xl font-bold bg-azulao rounded-xl p-3 px-6 text-white flex items-center mt-10 justify-center">
              Enviar Mensagem
            </Link>
          </div>
        </section>
        <section className="flex-1 mobile:w-10/12 desktop:w-10/12 mdscreen:w-10/12 h-full flex flex-col items-center justify-center py-10 mobile:py-1">
          <h1 className="text-4xl font-bold h-1/6 flex justify-center items-center w-full">Portfólio</h1>
          <div className="w-full grid grid-cols-2 p-6 gap-4">
            {portfolio.slice(0, 6).map((item, index) => (
              <PortfolioCard key={index} image={item.image} title={item.title} description={item.description} />
            ))}

          </div>
          <Link href={`/uzers/${_id}/portfolio`} className="text-xl font-bold my-8 flex justify-center items-center hover:underline">Ver Mais</Link>
        </section>

      </main>
    )
}

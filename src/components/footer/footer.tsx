import { GithubLogo } from '@phosphor-icons/react'; 

export function Footer(){
    return(
        <>
        <footer className="bg-[--cor--laranja--0] text-white text-center py-4">
          <div className="container mx-auto flex flex-col items-center text-center space-y-3">
            <div className="flex items-center space-x-2 text-sm">
              <a href="https://github.com/Gustav0Felipe" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
                <GithubLogo className='text-white' size={30} weight="bold"/>
                <span className='ml-1 text-white'>GitHub | feito por Gustavo Felipe  </span>
              </a>
            </div>
                <span className='ml-1 text-white'>Site Sem Proposito Comercial</span>
              <p>• © {new Date().getFullYear()} Ecommerce</p>
          </div>
        </footer>
        </>
    )
}


import { BrowserRouter } from "react-router-dom"
import { Header } from "../Header"
import { render, screen } from '@testing-library/react'


describe('<Header/>',  () => {
    it('Should render the titles inside of NavLinks', () => {
        render(
            <BrowserRouter>
                <Header/>
            </BrowserRouter>
        )
        expect(screen.getByTitle('Timer')).toBeTruthy() 
        expect(screen.getByTitle('Historic')).toBeTruthy() 
    })
})

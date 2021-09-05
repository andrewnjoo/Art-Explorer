import { render, screen, cleanup } from "@testing-library/react";
import MyNavbar from "../MyNavbar";

test('should render MyNavbar', ()=>{
    render(<MyNavbar/>)
})
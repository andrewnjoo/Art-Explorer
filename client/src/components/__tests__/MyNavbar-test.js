import { render, screen, cleanup } from "@testing-library/react";
import MyNavbar from "../MyNavbar";

test('should render MyNavbar', ()=>{
    render(<MyNavbar/>)
    const container = screen.getByTestId("container");
    expect(container).toBeInTheDocument;
    // expect(profile2).toHaveTextContent('sorry not');
})
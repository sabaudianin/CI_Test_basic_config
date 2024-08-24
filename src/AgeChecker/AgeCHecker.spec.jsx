import {render, screen, fireEvent, userEvent} from '@testing-library/react';
import {AgeChecker} from './AgeChecker';
import {LABELS} from "./Tekst"


describe('<AgeChecker/> test', () => {
    test("render without 'Loading...", () => {
        render(<AgeChecker/>);

        expect(screen.queryByText("Loading...")).toBeInTheDocument();
    });
    test("render without 'You are adult.", () => {
        render(<AgeChecker/>);

        expect(screen.queryByText(LABELS.YOU_ARE_ADULT)).not.toBeInTheDocument();
    });
    test("render without 'You are minor.", () => {
        render(<AgeChecker/>);

        expect(screen.queryByText("You are minor.")).not.toBeInTheDocument();
    });

    test("input age 20 & click check should display loading state ", async () => {
        render(<AgeChecker/>);
        const button = screen.getByRole('button');
        const input = screen.getByRole('spinbutton');
        fireEvent.change(input, {target: {value: 20}});
        fireEvent.focusOut(input)
        fireEvent.click(button);

        expect(await screen.getByRole("status")).toBeInTheDocument();
        expect(await screen.findByText(LABELS.YOU_ARE_ADULT)).toBeInTheDocument();
        expect(await screen.queryByRole("status")).not.toBeInTheDocument();
    });
    test("shows not adult for age under 18", async () => {
        render(<AgeChecker/>);
        const input = screen.getByPlaceholderText(LABELS.TYPE_YOUR_AGE);
        fireEvent.change(input, {target: {value: "16"},});
        fireEvent.focusOut(input);
        fireEvent.click(screen.getByText(LABELS.CHECK));

        expect(await screen.findByText(LABELS.YOU_ARE_MINOR)).toBeInTheDocument();
    });

})
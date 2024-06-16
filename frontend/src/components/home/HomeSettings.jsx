import { Form } from "react-bootstrap";

const HomeSettings = (category, setCategory) => {
    return ( 
        <div>
            <p>Choose what you want me to say:</p>
            <Form>
                <Form.Check 
                    name='category'
                    id='quotesOpt' 
                    type='radio' 
                    label='Quotes'
                    onChange={() => setCategory('quotes')}
                    checked={category === 'quotes'}
                />
                <Form.Check 
                    name='category'
                    id='jokesOpt' 
                    type='radio' 
                    label='Jokes'
                    onChange={() => setCategory('jokes')}
                    checked={category==='jokes'}
                />
                <Form.Check 
                    name='category'
                    id='triviasOpt' 
                    type='radio' 
                    label='Trivias'
                    onChange={() => setCategory('trivias')}
                    checked={category==='trivias'}
                />
            </Form>
        </div>
    );
}
 
export default HomeSettings;
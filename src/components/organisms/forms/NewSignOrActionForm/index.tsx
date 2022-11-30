import React  from 'react';
import Radio from "../../../atoms/inputs/Radio";
import TextArea from "../../../atoms/inputs/TextArea";
import Submit from "../../../atoms/inputs/Submit";
import {supabase} from "../../../../helpers/client";
import './style.css';

export default function NewSignOrActionForm() {
  const [type, setType] = React.useState('');
  const [state, setState] = React.useState('');
  const [internal, setInternal] = React.useState(true);
  const [description, setDescription] = React.useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('submitting', { type, state, internal, description });

    const table = type === 'signal' ? 'signals' : 'actions';

    const { error } = await supabase
      .from(table)
      .insert({ username: 'perry', state, internal, description })

    console.log('error', error);
  };

  return (
    <form onSubmit={onSubmit}
          className="new-sign-or-action-form"
    >
      <Radio options={['signal', 'action']}
             name="type"
             onChange={(value) => { setType(value) }}
      />
      <Radio options={['red', 'yellow', 'green']}
             name="state"
             onChange={(value) => { setState(value) }}
      />
      <Radio options={['internal', 'external']}
             name="internal"
             onChange={(value) => { setInternal(value === 'internal') }}
      />
      <TextArea name="description"
                onChange={(value) => { setDescription(value) }}
      />
      <Submit name="Submit" />
    </form>
  )
}

// RibosomalApp.js

import React, { useReducer } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import your custom styles

const initialState = {
  mRNA: '',
  peptides: '',
};

const translationReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_MRNA':
      const newMRNA = action.payload;
      const newPeptides = translateMRNA(newMRNA);
      return {
        ...state,
        mRNA: newMRNA,
        peptides: newPeptides,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const translateMRNA = (mRNA) => {
  const codonMapping = {
    'AUG': 'Met',
    'UUC': 'Phe',
    'UUU': 'Phe',
    'UUA': 'Leu',
    'UUG': 'Leu',
    'CUU': 'Leu',
    'CUC': 'Leu',
    'CUA': 'Leu',
    'CUG': 'Leu',
    'AUU': 'Ile',
    'AUC': 'Ile',
    'AUA': 'Ile',
    'GUU': 'Val',
    'GUC': 'Val',
    'GUA': 'Val',
    'GUG': 'Val',
    'UCU': 'Ser',
    'UCC': 'Ser',
    'UCA': 'Ser',
    'UCG': 'Ser',
    'CCU': 'Pro',
    'CCA': 'Pro',
    'CCG': 'Pro',
    'CCC': 'Pro',
    'ACU': 'Thr',
    'ACA': 'Thr',
    'ACG': 'Thr',
    'ACC': 'Thr',
    'GCU': 'Ala',
    'GCC': 'Ala',
    'GCA': 'Ala',
    'GCG': 'Ala',
    'UAU': 'Tyr',
    'UAC': 'Tyr',
    'UAA': 'Stop',
    'UAG': 'Stop',
    'CAU': 'His',
    'CAC': 'His',
    'CAA': 'Gln',
    'CAG': 'Gln',
    'AAU': 'Asn',
    'AAC': 'Asn',
    'AAA': 'Lys',
    'AAG': 'Lys',
    'GAU': 'Asp',
    'GAC': 'Asp',
    'GAA': 'Glu',
    'GAG': 'Glu',
    'UGU': 'Cys',
    'UGC': 'Cys',
    'UGA': 'Stop',
    'UGG': 'Trp',
    'CGU': 'Arg',
    'CGC': 'Arg',
    'CGA': 'Arg',
    'CGG': 'Arg',
    'AGU': 'Ser',
    'AGC': 'Ser',
    'AGA': 'Arg',
    'AGG': 'Arg',
    'GGU': 'Gly',
    'GGC': 'Gly',
    'GGA': 'Gly',
    'GGG': 'Gly'
  };

  // Split mRNA into codons and translate each one
  const codons = mRNA.match(/.{1,3}/g) || [];
  const peptides = codons.map(codon => codonMapping[codon] || '').join('-');

  console.log('mRNA:', mRNA);
  console.log('Peptides:', peptides);

  return peptides;
};

const RibosomalApp = () => {
  const [state, dispatch] = useReducer(translationReducer, initialState);

  const handleMRNAChange = (event) => {
    const newMRNA = event.target.value.toUpperCase(); // Convert to uppercase
    dispatch({ type: 'UPDATE_MRNA', payload: newMRNA });};

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <div className="ribosomal-app">
      <Navbar color="dark" dark expand="md">
        <Container className="navbarContainer">
          <NavbarBrand href="/">Ribosomal App</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="#" className="nav-link">Learn about Proteins</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" className="nav-link">Learn about Nucleic Acids</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" className="nav-link">Central dogma of Molecular biology</NavLink>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <div className='main'>
        <div>
          <label>
            <strong>mRNA:</strong>
            <input
              type="text"
              value={state.mRNA}
              onChange={handleMRNAChange}
              className="form-control"
              placeholder='Kindly input valid codons E.g. AUG'
            />
          </label>
        </div>
        <div className="peptides">
          <strong>Peptides: <br></br></strong> {state.peptides}
        </div>
        </div>
        <button className="btn btn-danger" onClick={handleReset}>Reset</button>
      </Container>
    </div>
  );
};

export default RibosomalApp;

// details.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { productId } = useParams();

  // Aqui você pode usar o productId para buscar os detalhes do produto

  return (
    <div>
      <h2>Detalhes do Produto {productId}</h2>
    </div>
  );
}

export default Details;

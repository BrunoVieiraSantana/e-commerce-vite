import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import detailsStyles from '../pages/details.module.css';

const Details = () => {

  return (
    <div>
        <div className={`${detailsStyles.container}`}>
            <aside className={`${detailsStyles.card}`}>
            <menu className={`${detailsStyles.menu}`}>
                <a className={detailsStyles.menuLink}>Detalhes</a>
            </menu>
            </aside>
        </div>
    </div>
  );
}

export default Details;

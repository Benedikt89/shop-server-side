import React from 'react';
import style from './Footer.module.css';

const Footer = () => {

    return (
        <footer>
            <div className={style.footerWrapper}>
                <div className={style.container}>
                    <div className={style.containerRow}>
                        <div className={style.containerCol}>
                            <h4>
                                CREATED BY
                            </h4>
                            <p>Constantine Kostka</p>
                            <p>г. Минск, ул. Козлова, д. 35</p>
                            <p>https://github.com/Benedikt89</p>
                        </div>
                        <div className={style.containerCol}>
                            <h4>
                                КОНТАКТЫ
                            </h4>
                            <p>Телефон: +375 29 3743228</p>
                            <p>Телефон: +375 33 6858121</p>
                            <p>E-mail: constantine.kostka@gmail.com</p>
                            <p>Сайт: https://benedikt89.github.io/portfolio/</p>
                        </div>
                    </div>
                    <div className={style.containerRow}>
                    </div>
                    <div className={style.container}>
                        <span>© 2019 Copyright: constantine</span>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;
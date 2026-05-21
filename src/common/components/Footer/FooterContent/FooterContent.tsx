import s from '@/common/components/Footer/Footer.module.css';

export const FooterContent = () => {
    return (
        <div className={s.footerContent}>
            <p className={s.copyright}>© 2026</p>
            <p className={s.footerTitle}>Kinopoisk Demo</p>
            <p className={s.footerLicence}>Data courtesy of TMDB</p>
        </div>
    );
};

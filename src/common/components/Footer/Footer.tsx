import s from './Footer.module.css';
import { IconVariant, PATH } from '@/common/enum';
import { icons } from '@/assets/icons/icons.tsx';
import { FooterContent } from '@/common/components/Footer/FooterContent/FooterContent.tsx';
import { Logo } from '@/common/components/Logo/Logo.tsx';

type FooterProps = {
    className?: string;
};

export const Footer = ({ className }: FooterProps) => {
    return (
        <footer>
            <div className={className}>
                <icons.logoBig className={s.footerAppLogo} />
                <FooterContent />
                <Logo path={PATH.GITHUB} variant={IconVariant.GIT} className={s.footerGitLogo} />
            </div>
        </footer>
    );
};

import { Zap, Mail, Phone, MapPin } from 'lucide-react';
import { FadeIn, Stagger } from '@/components/MotionPrimitives';

const footerLinks = [
  {
    title: '购物指南',
    links: ['购物流程', '会员介绍', '常见问题', '联系客服'],
  },
  {
    title: '配送方式',
    links: ['上门自提', '快递运输', '特快专递', '配送范围'],
  },
  {
    title: '支付方式',
    links: ['在线支付', '分期付款', '货到付款', '公司转账'],
  },
  {
    title: '售后服务',
    links: ['退换政策', '保修条款', '维修服务', '投诉建议'],
  },
];

export function Footer() {
  return (
    <footer
      style={{
        background: 'oklch(0.1 0.02 270)',
        borderTop: '1px solid var(--border)',
        paddingBlock: 'var(--spacing-3xl)',
      }}
    >
      <div className="container">
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6" style={{ gap: 'var(--spacing-xl)' }}>
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col" style={{ gap: 'var(--spacing-md)' }}>
            <FadeIn>
              <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
                <div
                  className="flex items-center justify-center rounded-lg bg-primary"
                  style={{ width: '2rem', height: '2rem' }}
                >
                  <Zap className="text-primary-foreground" style={{ width: '1.1rem', height: '1.1rem' }} />
                </div>
                <span
                  className="font-bold text-foreground"
                  style={{ fontSize: 'var(--font-size-title)' }}
                >
                  TechZone
                </span>
              </div>
              <p className="text-muted-foreground" style={{ fontSize: 'var(--font-size-label)', lineHeight: 'var(--line-height)' }}>
                TechZone — 你的数码生活好伙伴。精选全球优质数码产品，为你提供极致的购物体验与专业服务。
              </p>
              <div className="flex items-center" style={{ gap: 'var(--spacing-md)' }}>
                <div className="flex items-center text-muted-foreground" style={{ gap: '0.375rem', fontSize: 'var(--font-size-small)' }}>
                  <Phone style={{ width: '0.875rem', height: '0.875rem' }} />
                  400-888-6666
                </div>
              </div>
              <div className="flex items-center text-muted-foreground" style={{ gap: '0.375rem', fontSize: 'var(--font-size-small)' }}>
                <Mail style={{ width: '0.875rem', height: '0.875rem' }} />
                support@techzone.com
              </div>
              <div className="flex items-center text-muted-foreground" style={{ gap: '0.375rem', fontSize: 'var(--font-size-small)' }}>
                <MapPin style={{ width: '0.875rem', height: '0.875rem' }} />
                深圳市南山区科技园
              </div>
            </FadeIn>
          </div>

          {/* Link groups */}
          {footerLinks.map((group) => (
            <FadeIn key={group.title}>
              <div className="flex flex-col" style={{ gap: 'var(--spacing-sm)' }}>
                <h4
                  className="font-semibold text-foreground"
                  style={{ fontSize: 'var(--font-size-label)', marginBottom: 'var(--spacing-xs)' }}
                >
                  {group.title}
                </h4>
                {group.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                    style={{
                      fontSize: 'var(--font-size-small)',
                      transition: 'color var(--duration-fast) var(--ease-default)',
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </FadeIn>
          ))}
        </Stagger>

        {/* Copyright */}
        <div
          className="text-center text-muted-foreground"
          style={{
            marginTop: 'var(--spacing-2xl)',
            paddingTop: 'var(--spacing-lg)',
            borderTop: '1px solid var(--border)',
            fontSize: 'var(--font-size-small)',
          }}
        >
          &copy; 2026 TechZone. All rights reserved. | 粤ICP备XXXXXXXX号
        </div>
      </div>
    </footer>
  );
}

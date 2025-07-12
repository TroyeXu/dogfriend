import {
  useSeoMeta,
  useRoute,
  useRuntimeConfig,
  useHead,
  useLocaleHead,
} from '#imports'

export default function usePageSeo(
  title: string,
  description: string,
  image: string = '/vite.svg',
) {
  const route = useRoute()
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl || ''

  const { link: i18nLinks } = useLocaleHead({ addSeoAttributes: true })

  useHead({
    link: [
      { rel: 'canonical', href: baseUrl + route.fullPath },
      ...(i18nLinks || []),
    ],
    meta: [{ name: 'robots', content: 'index, follow' }],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: '首頁',
              item: baseUrl + '/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: title,
              item: baseUrl + route.fullPath,
            },
          ],
        }),
      },
    ],
  })

  useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
    ogType: 'website',
    ogUrl: baseUrl + route.fullPath,
    ogImage: baseUrl + image,
    twitterTitle: title,
    twitterDescription: description,
    twitterCard: 'summary_large_image',
    twitterImage: baseUrl + image,
  })
}

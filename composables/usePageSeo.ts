import { useSeoMeta, useRoute, useRuntimeConfig } from '#imports'

export default function usePageSeo(title: string, description: string) {
  const route = useRoute()
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl || ''

  useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
    ogType: 'website',
    ogUrl: baseUrl + route.fullPath,
    twitterTitle: title,
    twitterDescription: description,
    twitterCard: 'summary',
  })
}

// interface MetaProps {
//   data?: any
//   _type?: string
//   _title?: string
//   _description?: string
// }

// const defaultImage = 'https://cdn-new.levvel.io/levvel-meta.jpg'

// const Meta = ({ data, _type, _title, _description }: MetaProps) => {
//   const router = useRouter()
//   const path = router.asPath.split('?')[0]
//   const title = _title || get(data, 'fields.title') || get(data, 'fields.name')
//   const description = _description || get(data, 'fields.excerpt', '')
//   const featureImage = get(data, 'fields.featureImage')
//   const ogTitle = get(data, 'fields.ogTitle', title)
//   const ogDescription = get(data, 'fields.ogDescription', description)
//   const ogImage = get(data, 'fields.ogImage', featureImage || defaultImage

//   return (
//     <head>
//       <title>{title}</title>
//       <meta name="title" content={ogTitle} />
//       <meta name="description" content={ogDescription} />
//       <meta property="og:type" content={_type || 'article'} />
//       <meta property="og:title" content={ogTitle} />
//       <meta property="og:description" content={ogDescription} />
//       <meta property="og:image" content={ogImage} />
//       <meta property="og:image:secure_url" content={ogImage} />
//       <meta property="og:url" content={hostname + path} />
//     </head>
//   )
// }

// export default Meta

import React, { FC } from 'react'

const Meta: FC = () => {
  return <div></div>
}

export default Meta

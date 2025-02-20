import { client } from './configSanity';
import { groq } from 'next-sanity';

// Home Page
export async function getHomepage(id) {
  const query = groq`
    *[_type == "homepage" && _id == $id][0] {
      _id,
      _createdAt,
      title,
      "heroImage": heroImage.asset->url
    }
  `;

  const data = await client.fetch(query, { id });
  return data;
}

// Work Page
export async function getWorkpage(id) {
  const query = groq`
    *[_type == "work" && _id == $id][0] {
      _id,
      _createdAt,
      title,
    }
  `;

  const data = await client.fetch(query, { id });
  return data;
}

// About Page
export async function getAboutpage(id) {
  const query = groq`
    *[_type == "about" && _id == $id][0] {
      _id,
      _createdAt,
      title,
    }
  `;

  const data = await client.fetch(query, { id });
  return data;
}

// Single Project
export async function getProject(slug) {
  const query = groq`
    *[_type == 'projects' && slug.current == $slug][0] {
      _id,
      _createdAt,
      title,
      "slug": slug.current,
    }`;

  const data = await client.fetch(query, { slug });
  return data;
}

// All Projects List
export async function getProjectsList() {
  const query = groq`
    *[_type == 'projects'] | order(order asc){
      _id,
      _createdAt,
      title,
      "slug": slug.current,
    }`;
  const data = await client.fetch(query);
  return data;
}

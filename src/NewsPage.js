import React, { useParams } from 'react';

export default function NewsPage() {
  const { page } = useParams();

  return (
    <div>
      {page}
    </div>
  );
}

import { Box } from '@chakra-ui/react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Home() {

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {

    (async () => {
      console.log("id", id);
      if (id) {
        navigate(`/wechat?id=${id}`)
      }
    })()
  }, [id, navigate])


  return (
    <Box textAlign="center" bg="gray.50" minH="60vh">
      
    </Box>
  )
}
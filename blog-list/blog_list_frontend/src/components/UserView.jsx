import { Box, Card, CardContent, Typography } from '@mui/material'

const UserView = ({ user }) => {
  if (!user) {
    return <div></div>
  }

  return (
    <Card variant="outlined" sx={{ minWidth: 500, padding: 2, marginTop: 2 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 26 }}>
          {user.name}
        </Typography>

        <Typography variant="h6" sx={{ mb: 1 }}>
          Added blogs:
        </Typography>

        <Box component="ul" sx={{ pl: 2 }}>
          {user.blogs.map((blog) => (
            <Typography
              component="li"
              key={blog.id}
              variant="body2"
              sx={{ mb: 0.5 }}
            >
              {blog.title}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

export default UserView

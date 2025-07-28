import React from 'react'
import Layout from '../../components/Shared/Layout/Layout'
import { useSelector } from 'react-redux'

const AdminHome = () => {
    const {user} = useSelector(state=>state.auth)
  return (
    <Layout>
        <div className="container">
            <div className="d-flex flex-column mt-4">
                <h1>Welcome Admin <i className='tex-success '>{user?.name}</i></h1>
                <h3>Manage Blood Bank App</h3>
                <hr />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quod quas facere corporis molestias inventore voluptatem minus cumque quidem, eligendi debitis eius deleniti facilis praesentium ipsum error nihil iure aliquam repellendus fugit omnis. Adipisci doloribus blanditiis soluta, quidem itaque enim rem. Eum quas sit temporibus, ipsa ad odit tempora voluptatum explicabo molestiae soluta. Quia, est impedit laborum maiores velit voluptatum sit, eum nisi id in magni? Pariatur consequatur sunt temporibus a repellat consectetur eum assumenda facere maxime quisquam atque fugiat iusto, iure similique, autem beatae voluptates illo facilis, doloribus veritatis cum. Maiores reiciendis recusandae beatae amet dicta reprehenderit sit dolores minus qui, doloremque ea dolorem dignissimos natus eaque optio quisquam, at iusto excepturi, culpa consectetur omnis. Non, deserunt dolore sed possimus blanditiis excepturi quia pariatur doloribus maxime facilis, repellendus quis harum optio officia quibusdam obcaecati vel earum sequi commodi. At facere ex vero. Laudantium iusto velit tempore officia repudiandae totam assumenda neque. Dolor sed illo nemo sit sint repellendus, amet voluptatum neque cumque. Eum alias atque cumque consequuntur minus dolore voluptatem sequi sed, voluptas dignissimos rerum laudantium hic, quam nihil nemo dolorum numquam ipsa! Praesentium quas cumque dignissimos tenetur pariatur, iste, illo esse non voluptates quibusdam eligendi quidem ullam incidunt.</p>
            </div>
        </div>
    </Layout>
  )
}

export default AdminHome
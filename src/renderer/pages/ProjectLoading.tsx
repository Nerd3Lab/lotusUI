function ProjectLoading() {
  const searchParams = new URLSearchParams(window.location.hash.split('?')[1]);
  const name = searchParams.get('name');
  const description = searchParams.get('description');
  const isFullNode = searchParams.get('isFullNode') === 'true';
  const epochDuration = searchParams.get('epochDuration');
  const suiVersion = searchParams.get('suiVersion');

  console.log(window.location);

  console.log({
    name,
    description,
    isFullNode,
    epochDuration,
    suiVersion,
  });

  return (
    <div>
      <div className=""></div>
    </div>
  );
}

export default ProjectLoading;

import React, { useEffect, useState } from 'react'
import ScrollToTop from '../components/ScrollToTop.tsx'
import Title from '../components/Title.tsx'
import Table from '../components/tables/Table.tsx'
import { useLocation } from 'react-router-dom'
import { useAppContext } from '../context/index.tsx'
import { addLevel, deleteLevel, editLevel, getAllLevels } from '../scripts/fetch.ts'
import { showFailedMessage, showInfoMessage, showSuccessMessage, } from '../scripts/utils.js'
import LevelFormModal from '../components/tables/LevelFormModal.tsx'
import ConfirmDeleteModal from '../components/tables/ConfirmDeleteModal.tsx'

const Levels = () => {
  const location = useLocation();
  const { token, levels, setLevels } = useAppContext();
  const load = async () => {
    const res = await getAllLevels(token);
    setLevels(res);
    console.log(res);
  }

  useEffect(() => {
    load();
  }, [location]);



  const [isEditing, setIsEditing] = useState(false);
  const [levelEditing, setLevelEditing] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleAddLevel = () => {
    setShowModal(true);
    setIsEditing(false);
    
  }
  const handleEditLevel = (level) => {
    setShowModal(true);
    setIsEditing(true);
    setLevelEditing(level);
    
  }
  const handleDeleteLevel = (level) => {
    setLevelEditing(level);
    setShowDeleteModal(true);
  }


  const columns = [
    { name: 'level_image_url', label: '', type: 'image' },
    { name: 'level', label: 'Level', type: 'text' },
    { name: 'level_name', label: 'Level Name', type: 'text' },
    { name: 'level_threshold', label: 'Level Threshold', type: 'text' },
    { name: 'taprate_reward', label: 'Level Taprate', type: 'text' },

    { name: 'energy_reward', label: 'Level Energy Capacity', type: 'text' },
    { name: 'taprate_price', label: 'Level Taprate Price', type: 'price' },
    { name: 'taprate_price_reward', label: 'Taprate Purchase Reward', type: 'price' },
    { name: 'taprate_duration', label: 'Level Taprate Duration', type: 'text' },
  ]
  const data = levels;
  const actions = [
    { name: 'edit', icon: 'ri-edit-line', class: 'info-light', callback: handleEditLevel },
    { name: 'delete', icon: 'ri-delete-bin-5-line', class: 'danger-light', callback: handleDeleteLevel }
  ];


  const onAddLevel = async (level) => {
    console.log(level);

    // if (level) {
    //   const result = await addLevel({level_name:level.level_name, level_threshold:level.level_threshold, level_reward:level.level_reward, image_url:level.image_url}, token);
    //   showSuccessMessage(result);
    //   load();
    // } else {
    //   showFailedMessage('Level is invalid');
    // }

  }
  const onEditLevel = async (level) => {
    console.log(level);
    // if (level) {
    //   const result = await editLevel(level.level_id, {level_name:level.level_name, level_threshold:level.level_threshold, level_reward:level.level_reward, image_url:level.image_url}, token);
    //   showSuccessMessage(result);
    //   load();
    // } else {
    //   showFailedMessage('Level is invalid');
    // }

  }
  const onDeleteLevel = async (level) => {
    if (level) {
      const result = await deleteLevel(level.level_id, token);
      showSuccessMessage(result);
      load();
    } else {
      showFailedMessage('Level is invalid');
    }
  }




  return (
    <div className='h-full'>
      <LevelFormModal props={{ isEditing, levelEditing, showModal, setShowModal, onAddLevel, onEditLevel }} />
      <ConfirmDeleteModal props={{ item:levelEditing, showDeleteModal, setShowDeleteModal, callback:onDeleteLevel }} />

      <div className='w-100 p-2 d-flex justify-content-between'>
        <Title title="LEVELS" />
        <button onClick={() => handleAddLevel()} className='btn btn-primary fw-bold w-auto h-100'>+ New Level</button>
      </div>
      <Table props={{ title: 'All Levels', columns: columns, data, actions: actions }} />
      <ScrollToTop />
    </div>
  )
}

export default Levels